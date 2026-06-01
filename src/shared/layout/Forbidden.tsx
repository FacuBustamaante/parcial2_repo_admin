import { useNavigate } from "react-router-dom"
import { FaLock, FaArrowLeft } from "react-icons/fa"

const Forbidden = () => {
   const navigate = useNavigate()

   return (
      <div className="min-h-screen bg-(--bg) flex items-center justify-center px-6">
         <div className="flex flex-col items-center text-center max-w-md">

            <div className="w-20 h-20 rounded-full bg-(--gold-soft) flex items-center justify-center mb-6">
               <FaLock className="text-3xl text-(--gold)" />
            </div>

            <p className="serif text-8xl font-bold text-(--gold) leading-none mb-2">403</p>

            <h1 className="serif text-2xl font-semibold text-(--text) mt-4 mb-2">
               Acceso denegado
            </h1>

            <p className="sans text-sm text-(--text-muted) leading-relaxed mb-8">
               No tenés permisos para ver esta página. Si creés que es un error,
               contactá con un administrador.
            </p>

            <button
               onClick={() => navigate(-1)}
               className="flex items-center gap-2 px-5 py-2.5 bg-(--gold) text-(--gold-contrast) rounded-(--r-md) sans text-sm font-medium hover:bg-(--gold-deep) transition-colors"
            >
               <FaArrowLeft className="text-xs" />
               Volver atrás
            </button>
         </div>
      </div>
   )
}

export default Forbidden
