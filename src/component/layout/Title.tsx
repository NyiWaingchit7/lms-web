import { Helmet } from "react-helmet";
import { useAppSelector } from "../../store/hooks";
interface Props {
  title: string;
}
export const Title = ({ title }: Props) => {
  const { setting } = useAppSelector((store) => store.app);
  return (
    <Helmet>
      <title>{`${title || ""} - ${setting?.app_name || "Akone Learn"} `}</title>
    </Helmet>
  );
};
