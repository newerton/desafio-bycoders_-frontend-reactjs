import Link from 'next/link';

export const Footer = () => {
  return (
    <div className="flex items-center justify-center gap-1 p-5">
      <div>Developed with ❤️ by</div>
      <Link
        href="https://www.linkedin.com/in/newerton"
        rel="noopener noreferrer"
        target="_blank"
      >
        Newerton
      </Link>
    </div>
  );
};
