import { NextPage } from "next";

import DefaultLayout from "../layouts/DefaultLayout";

const About: NextPage<{}> = ({}) => {
  return (
    <DefaultLayout>
      <p>About Page Next.js</p>
    </DefaultLayout>
  );
}

export default About;