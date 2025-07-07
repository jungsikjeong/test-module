import { ArrowLeft } from "lucide-react";
import { SectionTitle } from "../../components/Base/SectionTitle";
import { Form } from "../../components/ui/form";
import Input from "../../components/Forms/Input";
import SigninForm from "./_components/SigninForm";

export default function Page() {
  return (
    <div>
      <header className="flex items-center justify-between px-4 py-3 border-b">
        <ArrowLeft className="w-6 h-6" />
        <SectionTitle title="로그인" />
        <div className="w-6"></div>
      </header>

      <h2 className="mt-8 text-center typo-medium font-bold">
        세상의 모든 미용재료가 있는곳
        <br />
        아몬드영
      </h2>

      <SigninForm />
    </div>
  );
}
