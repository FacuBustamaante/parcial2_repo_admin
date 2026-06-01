import AdminRegisterForm from "../forms/AdminRegisterForm";

type Props = {
  onClose: () => void;
};

function AdminModal({ onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <AdminRegisterForm onSuccess={onClose} />
      </div>
    </div>
  );
}

export default AdminModal;


