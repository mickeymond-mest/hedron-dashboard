import { InlineLoading } from "carbon-components-react";
import { NextComponentType } from "next";

type LoadingProps = {
  description: string;
}

const Loading: NextComponentType<any, any, LoadingProps> = ({ description }) => {
  return (
    <InlineLoading id="loading" description={description} />
  );
}

export default Loading;