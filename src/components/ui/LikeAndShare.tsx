// import { OptimisticLikeCounter } from "./OptimisticLikeCounter";
import ShareButton from "./ShareButton";

type LikeAndShareProps = {
  postId: string;
  initialLikes: number;
  openShareModal: () => void;
};

export default function LikeAndShare({ openShareModal }: LikeAndShareProps) {
  return (
    <div className="flex gap-4 mt-10">
      <ShareButton onClick={openShareModal} />
      {/* <OptimisticLikeCounter
        initialLikes={initialLikes}
        postId={postId}
      ></OptimisticLikeCounter> */}
    </div>
  );
}
