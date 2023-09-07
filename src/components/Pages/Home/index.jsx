import { ClockIcon, LocationIcon, PhoneIcon } from "components/svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Validation } from "./Validation";
import HFInputMask from "components/UI/FormElements/HFInputMask";
import HFInput from "components/UI/FormElements/HFInput";
import Square from "../../UI/Square";
import axios from "axios";
import CButton from "components/UI/CButton";
const HomePageWrapper = () => {
  const schema = Validation();
  const {
    control,
    handleSubmit,
    reset,
    register,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const telegramBotToken = "6086769246:AAFg14exwwQ-wlvuOzkCIpdPeqfha9FkVRQ";
  const chatId = "-992401656";

  const sendMessageToTelegram = async (message) => {
    try {
      const response = await axios.post(
        `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
        {
          chat_id: chatId,
          text: message,
        }
      );

      console.log("Message sent to Telegram:", response.data);
    } catch (error) {
      console.error("Error sending message to Telegram:", error);
    }
  };

  const onSubmit = (data) => {
    const message = `Ism: ${data.full_name}, Kompaniya: ${data.company}, Tel.raqam: ${data.phone_number}`;
    sendMessageToTelegram(message);
  };

  return (
    <>
      <div className="bg-[#213269] text-white py-10">
        <div className="container">
          <div className="flex items-center justify-between">
            <p className="text-[45px] font-medium">Proten</p>
            <div>
              <p className="font-medium leading-[18px]">
                Biz bilan bog'laning:
              </p>
              <a
                href="tel:998917823111"
                className="font-medium flex items-center space-x-[6px]"
              >
                <div className="w-[17px] h-[17px] bg-[#aec5f2] flex items-center justify-center mr-1">
                  <PhoneIcon />
                </div>{" "}
                +998 91 782 31 11
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center relative h-[40vh]">
            <h1 className="text-[44px] leading-[44px] mobile:text-[56px] font-[600] text-center leading-[66px]">
              Toval belgilarini <br /> potentlash xizmati
            </h1>

            <div className="absolute left-0 bottom-0 grid grid-cols-2">
              <Square />
              <div></div>
              <Square classes="bg-[#395299]" />
              <Square classes="bg-[#6785c6]" />
            </div>
            <div className="absolute right-0 bottom-0 grid grid-cols-2">
              <div></div>
              <Square classes="bg-[#001842]" />
              <Square classes="bg-[#4a80dd]" />
              <Square />
            </div>
          </div>
        </div>
      </div>
      <div className="py-10">
        <div className="container">
          <div className="flex justify-between relative mobile:flex-row flex-col">
            <div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mobile:w-[250px] space-y-5"
              >
                <h3 className="text-2xl text-white font-medium">
                  Ariza qoldirish:
                </h3>
                <HFInput
                  name="full_name"
                  // label={item.label}
                  placeholder="Ism-sharifingiz"
                  register={register}
                  {...register("full_name", {
                    required: true,
                  })}
                  required={true}
                  errors={errors}
                />
                <HFInput
                  name="company"
                  // label={item.label}
                  placeholder="Kompaniyangiz"
                  register={register}
                  {...register("company", {
                    required: true,
                  })}
                  required={true}
                  errors={errors}
                />
                <HFInputMask
                  control={control}
                  name="phone_number"
                  placeholder="+998 "
                  errors={errors}
                  mask="+\9\9\8 99 999 99 99"
                  maskchar={null}
                  alwaysShowMask={false}
                  classesInput="bg-[#395299] text-white rounded-[2px] h-[42px]"
                />
                <button
                  type="submit"
                  className="bg-[#082566] w-full h-[40px] text-center text-white rounded-[4px]"
                >
                  Ma'lumotni jo'natish
                </button>
              </form>
              <p className="text-[45px] font-medium text-white hidden mobile:visible">
                Proten
              </p>
            </div>

            <div className="mobile:w-[270px] text-white mt-10 mobile:mt-0">
              <h3 className="text-2xl text-white font-medium mb-3">
                Kontaktlar:
              </h3>
              <ul className="space-y-3 ">
                <li>
                  <a href="#" className="font-medium flex">
                    <div className="w-[17px] h-[17px] bg-[#aec5f2] flex items-center justify-center mr-1 mt-1">
                      <div className="w-[17px]">
                        <LocationIcon />
                      </div>
                    </div>{" "}
                    Shota Rustaveli ko‘chasi, 150-uy Vega Center, 3-qavat,
                    24-ofis
                  </a>
                </li>
                <li>
                  <p className="flex items-center">
                    <div className="w-[17px] h-[17px] bg-[#aec5f2] flex items-center justify-center mr-1">
                      <ClockIcon />
                    </div>{" "}
                    Du-Sh 9:00 - 18:00
                  </p>
                </li>
                <li>
                  <a href="tel:998917823111" className="flex items-center">
                    <div className="w-[17px] h-[17px] bg-[#aec5f2] flex items-center justify-center mr-1">
                      <PhoneIcon fill="#4877ea" />
                    </div>{" "}
                    +998 91 782 31 11
                  </a>
                </li>
              </ul>

              <p className="text-[45px] font-medium text-white mt-3 mobile:hidden">
                Proten
              </p>

              <div className="absolute right-0 bottom-0 grid grid-cols-2">
                <div></div>
                <Square classes="bg-[#8fb2ef]" />
                <Square classes="bg-[#082566]" />
                <Square classes="bg-[#395299]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePageWrapper;
