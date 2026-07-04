import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./MarkdownRenderer.module.scss";

function MarkdownRenderer({ content, resolveImageUrl }) {
    return (
        <div className={styles.markdown}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    img: ({ node, ...props }) => {
                        const src = props.src ? resolveImageUrl(props.src) : props.src;
                        return <img {...props} src={src} />;
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}

export default MarkdownRenderer;