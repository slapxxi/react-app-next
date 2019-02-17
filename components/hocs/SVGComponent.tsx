interface SVGProps {
  size: number;
  className?: string;
}

interface Config extends React.SVGProps<SVGElement> {}

function SVGComponent(
  Component: React.ComponentType,
  config?: Config,
): React.ComponentType<SVGProps> {
  return (props: SVGProps) => {
    let { size, className, ...rest } = props;
    return (
      <svg
        width={size}
        height={size}
        viewBox={config && config.viewBox}
        className={className}
      >
        <Component {...rest} />
      </svg>
    );
  };
}

export default SVGComponent;
