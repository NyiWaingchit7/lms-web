import { Helmet } from "react-helmet";
interface Props {
  title: string;
}
export const Title = ({ title }: Props) => {
  return (
    <Helmet>
      <title>{`${title || ""} - Akone Learn `}</title>
    </Helmet>
  );
};
