interface Player {
  // isBanned: boolean;
  // externalAppDisplayName: string | null;
  hasVerifiedBadge: boolean;
  name: string;
  displayName: string;
  img: string;
  id: string;
}
const PlayerData = ({
  id,
  img,
  displayName,
  hasVerifiedBadge,
  name,
}: Player) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg text-white mt-4 flex flex-col gap-2 items-center">
      <div className="profile">
        <img src={img} className="rounded-full size-[70px] mx-auto" alt="" />
        <h2 className="text-center">
          {displayName}
          {hasVerifiedBadge && <span className="verified"> ✔</span>}
        </h2>
        <p className="username text-center">@{name}</p>
        <p className="username text-center">id: {id}</p>
      </div>
    </div>
  );
};

export default PlayerData;
