function Button({ text, icon, onClick, className }) {
  return (
    <button onClick={onClick} className={`flex flex-row items-center justify-center gap-1 px-4 py-2 rounded-md text-lg font-semibold bg-white text-black ${className || ''}`}>
      {icon}
      {text}
    </button>
  );
}

export default Button;