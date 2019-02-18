interface SVGProps {
  size: number;
  className?: string;
}

interface Config extends React.SVGAttributes<SVGElement> {}

function SVGComponent(
  Component: React.ComponentType,
  config?: Config,
): React.ComponentType<SVGProps> {
  return (props: SVGProps) => {
    let { size, className, ...rest } = props;
    return (
      <svg width={size} height={size} className={className} {...config}>
        <Component {...rest} />
      </svg>
    );
  };
}

export default SVGComponent;
