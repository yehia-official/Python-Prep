export function Logo() {
  return (
    <div className="flex items-center gap-2" aria-label="Python Prep Logo">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <path
          fill="#3F51B5" // Primary Blue from theme
          d="M255.5,159.2c-2.4-5.9-6.4-11-11.5-14.8c-10.3-7.6-23.3-10-35.8-6.9l-38.3,9.5c-4.9,1.2-9.6,3.4-13.6,6.6c-5.4,4.2-9.2,9.6-11,15.8c-1.8,6.2-1.5,12.8,0.8,18.7c3,7.9,8.9,14.4,16.5,18.4c10.3,5.4,22.4,6.5,33.9,3.1l38.3-9.5c4.9-1.2,9.6-3.4,13.6-6.6C251,186,255,173,255.5,159.2z"
        ></path>
        <path
          fill="#FFC43D" // A complementary yellow, like the original Python logo
          d="M0.5,96.8c2.4,5.9,6.4,11,11.5,14.8c10.3,7.6,23.3,10,35.8,6.9l38.3-9.5c4.9-1.2,9.6-3.4,13.6-6.6c5.4-4.2,9.2,9.6,11-15.8c1.8-6.2,1.5-12.8-0.8-18.7c-3-7.9-8.9-14.4-16.5-18.4c-10.3-5.4-22.4-6.5-33.9-3.1l-38.3,9.5c-4.9,1.2-9.6,3.4-13.6,6.6C4.9,70,0.9,83,0.5,96.8z"
        ></path>
      </svg>
      <span className="text-2xl font-bold font-headline">Python Prep</span>
    </div>
  );
}
