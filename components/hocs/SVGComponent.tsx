interface SVGProps {
  size: number;
  className?: string;
}

interface Config extends React.SVGAttributes<SVGElement> {}

function SVGComponent(
  Component: React.ComponentType<React.ComponentProps<any>>,
  config?: Config,
): React.ComponentType<SVGProps> {
  return (props: SVGProps) => {
    let { size, className, ...rest } = props;

    return (
      <svg width={size} height={size} className={className} {...config}>
        <Component {...rest} className={className} />
      </svg>
    );
  };
}

export default SVGComponent;
