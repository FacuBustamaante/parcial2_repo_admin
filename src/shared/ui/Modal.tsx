type Props = {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
};

export default function Modal({ children, onClose, title }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-(--surface) border border-(--line-strong) rounded-(--r-lg) p-6 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2 className="serif text-xl font-semibold text-(--text) mb-5">{title}</h2>
        )}
        {children}
        <button
          onClick={onClose}
          className="mt-4 w-full border border-(--line-strong) text-(--text-muted) rounded-(--r-md) py-2 sans text-sm hover:text-(--text) transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
