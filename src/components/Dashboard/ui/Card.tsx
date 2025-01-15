import clsx from 'clsx'; 

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-lg border bg-white p-6 shadow-sm transition-all',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}