// src/components/PostImage.tsx
interface PostImageProps {
  imageUrl: string;
}

function PostImage({ imageUrl }: PostImageProps) {
  return (
    <div className="post-image-container">
      <img 
        src={imageUrl} 
        alt="Post content" 
        style={{ width: '100%', display: 'block' }} 
      />
    </div>
  );
}

export default PostImage;