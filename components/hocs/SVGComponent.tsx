import { ComponentProps, ComponentType } from 'react';

interface SVGProps extends ComponentProps<'g'> {
  size: number;
  className?: string;
}

type Config = React.SVGAttributes<SVGElement>;

function SVGComponent<Props extends SVGProps>(
  Component: React.ComponentType<Props>,
  config?: Config,
): React.ComponentType<Props> {
  let SVGComp: ComponentType<Props> = (props: Props) => {
    let { size, className, ...rest } = props;

    return (
      <svg width={size} height={size} className={className} {...config}>
        <Component {...rest} className={className} />
      </svg>
    );
  };

  SVGComp.displayName = 'SVGComponent';

  return SVGComp;
}

export default SVGComponent;
