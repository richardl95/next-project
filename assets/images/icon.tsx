import React from 'react'

interface Props {
  src: any
  className?: string
}

const Icon: React.FC<Props> = ({
  src: Component,
  className,
  ...restProps
}) => {
  return (
    <>
      <Component className={className} {...restProps} />
    </>
  )
}

export default Icon
