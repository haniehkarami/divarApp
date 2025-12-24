import { toast } from "react-toastify";
import { sendOtp } from "../../services/auth";
import { useForm } from "react-hook-form";

function SendOtpForm({ mobile, setMobile, setStep }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({ defaultValues: { mobile: mobile || "" }, mode: "onTouched" });

  const onSubmit = async (data) => {
    try {
      const loadingToast = toast.loading("در حال ارسال کد تایید ...");

      const { response, error } = await sendOtp(data.mobile);

      toast.dismiss(loadingToast);
      if (response) {
        toast.success("کد تایید با موفقیت ارسال شد");
        setMobile(data.mobile);
        setStep(2);
      }
      if (error) {
        toast.error(error.response?.data?.message || "خطا در ارسال کد تایید");
      }
    } catch (error) {
      toast.error("مشکلی در ارتباط با سرور رخ داده است");
      console.error("Error in sendingOTP:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>ورود به حساب کاربری</p>
      <span>
        برای استفاده از امکانات دیوار ، لطفا شماری موبایل خود را وارد کنید. کد
        تایید به این شماره پیامک خواهد شد.
      </span>
      <label htmlFor="input">شماره موبایل خود را وارد کنید</label>
      <input
        type="text"
        placeholder="شماره موبایل"
        {...register("mobile", {
        onChange: (e) =>  setMobile(e.target.value), 
        })}
      />

      {errors.mobile && (
        <p style={{ color: "red", flexWraponstSize: "14px" }}>
          {errors.mobile.message}
        </p>
      )}
      <button type="submit" disabled={isSubmitting}>
         {isSubmitting ? "ارسال کد تایید" : "در حال ارسال کد تایید ..."}
         </button>
    </form>
  );
}

export default SendOtpForm;
