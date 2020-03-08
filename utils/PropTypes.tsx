import { WithRouterProps } from "next/dist/client/with-router"

// Prop Types File

type User = {
  nickname: string;
  sub: string;
}

export interface NextPageProps extends WithRouterProps {
  user: User;
}