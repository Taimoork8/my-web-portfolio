import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import hljs from "highlight.js";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover: string;
  diagram: string;
  content: string;
}

const articlesDirectory = path.join(process.cwd(), "articles", "articles");

// Configure a custom renderer for marked to use highlight.js for syntax highlighting
const renderer = new marked.Renderer();
renderer.code = ({ text, lang }) => {
  const language = lang && hljs.getLanguage(lang) ? lang : "plaintext";
  const highlighted = hljs.highlight(text, { language }).value;
  return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
};

// Also customize images in markdown to map local path (e.g. images/01-diagram.svg) to /images/01-diagram.svg
renderer.image = ({ href, title, text }) => {
  let cleanHref = href || "";
  if (cleanHref.startsWith("images/")) {
    cleanHref = "/" + cleanHref;
  } else if (cleanHref.startsWith("./images/")) {
    cleanHref = cleanHref.replace("./images/", "/images/");
  }
  return `<img src="${cleanHref}" alt="${text || ""}" title="${title || ""}" class="my-8 mx-auto rounded-xl border border-[#27272A] max-w-full h-auto" />`;
};

// Configure marked options
marked.use({ renderer });

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(articlesDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Parse metadata section
      const { data, content } = matter(fileContents);

      // Get prefix from the markdown filename (e.g., "01" from "01-flutter-clean-architecture.md")
      const prefix = fileName.split("-")[0];

      // Clean cover path from frontmatter (e.g. "images/01-cover.svg" -> "/images/01-cover.svg")
      let cover = data.cover || "";
      if (cover.startsWith("images/")) {
        cover = "/" + cover;
      } else if (cover.startsWith("./images/")) {
        cover = cover.replace("./images/", "/images/");
      }

      // Dynamically resolve the matching diagram SVG by prefix
      const diagram = `/images/${prefix}-diagram.svg`;

      // Convert date to readable string/ISO date
      let dateStr = "";
      if (data.date) {
        if (data.date instanceof Date) {
          dateStr = data.date.toISOString().split("T")[0];
        } else {
          dateStr = String(data.date);
        }
      }

      // Pre-process markdown content: replace standard relative images with absolute path ones
      // This is a backup for any parser quirks
      let processedContent = content;
      processedContent = processedContent.replace(/\]\(images\//g, "](/images/");
      processedContent = processedContent.replace(/\]\(\.\/images\//g, "](/images/");

      return {
        slug: data.slug || fileName.replace(/\.md$/, ""),
        title: data.title || "Untitled",
        description: data.description || "",
        date: dateStr,
        tags: Array.isArray(data.tags) ? data.tags : [],
        cover,
        diagram,
        content: processedContent,
      };
    });

  // Sort posts by date descending
  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;

  // Compile markdown to HTML
  const htmlContent = marked.parse(post.content) as string;

  return {
    ...post,
    content: htmlContent,
  };
}
