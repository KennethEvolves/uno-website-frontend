import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  content: string;
  className?: string;
}

export const MarkdownRenderer = ({ content, className = "" }: Props) => {
  if (!content) return null;

  const processedContent = content.replace(/\\n/g, "\n\n");

  return (
    <div
      className={`w-full max-w-none
      
      text-base leading-relaxed text-secondary opacity-90 

      [&_p]:mb-4
      
      [&_strong]:font-bold [&_strong]:text-uno-secondary
      [&_a]:font-bold [&_a]:text-uno-secondary [&_a]:underline hover:[&_a]:text-black
      
      [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-5 
      [&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:pl-5 
      [&_li]:mb-2 [&_li::marker]:font-bold [&_li::marker]:text-uno-secondary
      [&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-extrabold [&_h1]:text-gray-900
      [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900
      [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-gray-900
      
      [&_img]:mx-auto [&_img]:rounded-xl [&_img]:shadow-sm [&_img]:my-6

      ${className}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="mb-8 last:mb-0">{children}</p>,
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};
