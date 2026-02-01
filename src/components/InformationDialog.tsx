import type { Player } from "./PlayerData";
import { DialogClose } from "./ui/dialog";
interface Props {
  joined?: string;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}
const InformationDialog = ({
  id,
  img,
  displayName,
  name,
  setCurrentStep,
  joined,
}: Props & Player) => {
  return (
    <>
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full text-center relative shadow-2xl mx-auto">
        <h3 className="text-xl font-bold text-white mb-6">
          Account Confirmation
        </h3>
        <img
          src={img}
          alt="Avatar"
          className="w-24 h-24 mx-auto rounded-full border-4 border-slate-700 mb-4 shadow-lg"
        />

        <div className="space-y-1 mb-6">
          <p id="modal-displayname" className="text-xl font-bold text-white">
            {displayName || "mokrim2017"}
          </p>
          <p id="modal-username" className="text-slate-400 text-sm">
            {"@" + name}
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="px-2 py-0.5 bg-slate-700 rounded text-xs text-slate-300">
              ID: <span id="modal-id"> {id} </span>
            </span>
            <span className="px-2 py-0.5 bg-slate-700 rounded text-xs text-slate-300">
              Joined:
              <span id="modal-created">{joined || "January 27, 2026"} </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <DialogClose
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
            className="py-3 px-4 rounded-xl font-semibold text-slate-300 bg-slate-700 hover:bg-slate-600 transition-colors"
          >
            No, Cancel
          </DialogClose>
          <DialogClose
            onClick={() => setCurrentStep(3)}
            id="confirm-account"
            className="py-3 px-4 rounded-xl font-bold text-white bg-linear-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 transition-all shadow-lg shadow-sky-500/20"
          >
            Yes, Connect
          </DialogClose>
        </div>
      </div>
    </>
  );
};

export default InformationDialog;
