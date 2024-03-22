import Container from "./Container";
import { searchStore } from "../store/searchStore";
import { textStore } from "../store/textStore";

const ShowResult = () => {
  const choice = searchStore((state: any) => state.choice);
  const text = textStore((state: any) => state.text);
  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        <div>Evler</div>
        {choice}
        <div>Evler</div>
        {text}
        <div>Evler</div>
        <div>Evler</div>
        <div>Evler</div>
        <div>Evler</div>
        <div>Evler</div>
        <div>Evler</div>
        <div>Evler</div>
        <div>Evler</div>
      </div>
    </Container>
  );
};

export default ShowResult;
