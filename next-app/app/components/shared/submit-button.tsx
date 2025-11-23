interface props {
  text: string;
}
export default function SubmitButton({ text }: props) {
  return (
    <button type="submit" className="bg-yellow w-[400px] text-center text-black rounded-lg py-3">
      {text}
    </button>
  );
}
