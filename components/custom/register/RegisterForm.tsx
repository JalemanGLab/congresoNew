// src/pages/register/RegisterForm.tsx
import useRegisterForm from './useRegisterForm';
import { HiOutlineUser, HiOutlineClipboardList, HiOutlineQuestionMarkCircle, HiOutlineCreditCard, HiOutlineMail, HiOutlinePhone, HiOutlineIdentification, HiOutlineLocationMarker, HiOutlineDocumentText, HiOutlineCalendar, HiOutlineLockClosed } from "react-icons/hi";
import { MdNumbers } from "react-icons/md";
import InputField from '../inputs/inputField/InputField';
import SelectData from '../inputs/selectData/SelectData';
import { Toaster } from 'sonner';

const RegisterForm = () => {
   const { 
       register, 
       handleSubmit, 
       control,
       watch,
       errors,
       registerPayment,
       handleSubmitPayment,
       controlPayment,
       paymentErrors,
       step,
       setStep,
       selectedPayment,
       setSelectedPayment,
       handleStep1Submit,
       handleStep2Submit,
       handleStep3Submit,
       distributorsOptions,
       proceduresOptions,
       brandOptions,
       banksOptions,
       documentTypeOptions
   } = useRegisterForm();
    return (
        <div className="w-full  bg-gray-100 flex flex-col">
            <Toaster position="top-right" />
            <div className="w-full bg-white flex justify-center">
               <div className="w-[900px] flex flex-col justify-center items-center rounded-lg p-10 gap-10">
                  <div className="w-full flex flex-col justify-center items-center gap-3">
                     <div className="text-3xl text-[#333333] text-center font-bold">Formulario de registro</div>
                     <div className="w-[150px] h-1 bg-[#333333] rounded"></div>
                     <div className="text-[#333333] text-center text-sm">Complete el formulario para registrarse y acceder a nuestros servicios exclusivos</div>
                  </div>
                  <div className="relative flex items-center w-full">
                     <div className="absolute top-6 left-[16%] right-[16%] h-[2px] bg-[#A0A0A0]"></div>
                     <div className="flex flex-col items-center w-1/3 relative z-10">
                        <div className={`flex justify-center items-center w-14 h-14 rounded-full ${step >= 1 ? 'bg-gradient-to-b from-[#000000] to-[#464646]' : 'bg-[#D9D9D9]'}`}>
                           <HiOutlineUser className={`text-3xl ${step >= 1 ? 'text-white' : 'text-[#666666]'}`} />
                        </div>
                        <span className="hidden md:block text-sm text-center">Datos personales</span>
                     </div>
                     <div className="flex flex-col items-center w-1/3 relative z-10">
                        <div className={`flex justify-center items-center w-14 h-14 rounded-full ${step >= 2 ? 'bg-gradient-to-b from-[#000000] to-[#464646]' : 'bg-[#D9D9D9]'}`}>
                           <HiOutlineClipboardList className={`text-3xl ${step >= 2 ? 'text-white' : 'text-[#666666]'}`} />
                        </div>
                        <span className="hidden md:block text-sm text-center">Datos profesionales</span>
                     </div>
                     <div className="flex flex-col items-center w-1/3 relative z-10">
                        <div className={`flex justify-center items-center w-14 h-14 rounded-full ${step >= 3 ? 'bg-gradient-to-b from-[#000000] to-[#464646]' : 'bg-[#D9D9D9]'}`}>
                           <HiOutlineCreditCard className={`text-3xl ${step >= 3 ? 'text-white' : 'text-[#666666]'}`} />
                        </div>
                        <span className="hidden md:block text-sm text-center">Método de pago</span>
                     </div>
                  </div>   
                  <div className="w-full bg-white flex flex-col rounded-lg p-10 gap-5 shadow-2xl">
                     {step === 1 && (
                        <div className="w-full flex flex-col gap-5">
                           <div className="text-2xl text-[#333333] text-center font-bold">Información personal</div>
                           <div className="text-sm text-[#A0A0A0]">Porfavor complete sus datos personales</div>
                           <form onSubmit={handleSubmit(handleStep1Submit)} className="w-full flex flex-col gap-5">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                 <InputField 
                                    name="first_name"
                                    inputType="text"
                                    placeholder="Nombre"
                                    label="Nombre"
                                    childrenIcon={<HiOutlineUser className="text-2xl"/>}
                                    register={register}
                                    errors={errors}
                                    rules={{ required: true }}
                                 />
                                 <InputField 
                                    name="last_name"
                                    inputType="text"
                                    placeholder="Apellido"
                                    label="Apellido"
                                    childrenIcon={<HiOutlineUser className="text-2xl"/>}
                                    register={register}
                                    errors={errors}
                                    rules={{ 
                                        required: true,
                                        minLength: 2,
                                        pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/
                                    }}
                                 />
                                 <InputField 
                                    name="email"
                                    inputType="email"
                                    placeholder="correo@ejemplo.com"
                                    label="Correo electrónico"
                                    childrenIcon={<HiOutlineMail className="text-2xl"/>}
                                    register={register}
                                    errors={errors}
                                    rules={{ 
                                        required: true,
                                        pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                                    }}
                                 />
                                 <InputField 
                                    name="id"
                                    inputType="number"
                                    placeholder="Número de cédula"
                                    label="Cédula"
                                    childrenIcon={<HiOutlineIdentification className="text-2xl"/>}
                                    register={register}
                                    errors={errors}
                                    rules={{ 
                                        required: true,
                                        minLength: 4,
                                        maxLength: 20,
                                        pattern: /^[0-9]+$/
                                    }}
                                 />
                                 <InputField 
                                    name="phone"
                                    inputType="tel"
                                    placeholder="Número de teléfono"
                                    label="Teléfono"
                                    childrenIcon={<HiOutlinePhone className="text-2xl"/>}
                                    register={register}
                                    errors={errors}
                                    rules={{ 
                                        required: true,
                                        pattern: /^[0-9]+$/,
                                        minLength: 10,
                                        maxLength: 10
                                    }}
                                 />
                                 <InputField 
                                    name="city"
                                    inputType="text"
                                    placeholder="Ciudad"
                                    label="Ciudad"
                                    childrenIcon={<HiOutlineLocationMarker className="text-2xl"/>}
                                    register={register}
                                    errors={errors}
                                    rules={{ 
                                        required: true,
                                        minLength: 3,
                                        pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/
                                    }}
                                 />
                              </div>
                              <div className="w-full h-[1px] bg-[#eeeeee]"></div>  
                              <div className="w-full flex flex-col-reverse sm:flex-row justify-end gap-3">
                                 <button 
                                    type="submit"
                                    className="w-full sm:w-[180px] md:w-[240px] md:font-semibold h-[50px] bg-[#333333] text-white rounded-lg flex items-center justify-center gap-2 hover:bg-[#444444] transition-colors text-sm font-medium cursor-pointer"
                                 >
                                    Continuar a datos profesionales
                                 </button>
                              </div>
                           </form>
                        </div>
                     )}
                     {step === 2 && (
                        <div className="w-full flex flex-col gap-5">
                           <div className="text-2xl text-[#333333] text-center font-bold">Información profesional</div>
                           <div className="text-sm text-[#A0A0A0] text-center">Porfavor complete sus datos profesionales</div>
                           <form onSubmit={handleSubmit(handleStep2Submit)} className="w-full flex flex-col gap-5">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                 <SelectData 
                                    label="¿Dónde quieres redimir el bono?"
                                    options={distributorsOptions}
                                    name="distributor"
                                    errors={errors}
                                    rules={{ required: true }}
                                    control={control}
                                 />
                                 <SelectData 
                                    label="¿Cual es el principal procedimiento clínico?"
                                    options={proceduresOptions}
                                    name="main_procedure"
                                    errors={errors}
                                    rules={{ required: true }}
                                    control={control}
                                 />
                                 <SelectData 
                                    label="¿Marca que más usa en su consulta?"
                                    options={brandOptions}
                                    name="brand"
                                    errors={errors}
                                    rules={{ required: true }}
                                    control={control}
                                 />
                                 {watch('brand') === 'otro' && (
                                    <InputField 
                                       name="other_brand"
                                       inputType="text"
                                       placeholder="¿Cuál marca?"
                                       label="Especifique la marca"
                                       register={register}
                                       errors={errors}
                                       rules={{ required: true }}
                                       childrenIcon={<HiOutlineQuestionMarkCircle className="text-2xl"/>}
                                    />
                                 )}
                                 <InputField 
                                    name="cases_per_week"
                                    inputType="number"
                                    placeholder="Casos por semana"
                                    label="Casos por semana"
                                    childrenIcon={<MdNumbers className="text-2xl"/>}
                                    register={register}
                                    errors={errors}
                                    rules={{ required: true, min: 0, max: 100 }}
                                 />
                                 <div className="w-full h-[40px] flex items-center px-4 mt-6 rounded border border-gray-300 bg-[#fafafa] gap-2">
                                    <input
                                       type="checkbox"
                                       {...register('authorization', { required: true })}
                                       className="mt-1 accent-[#333333]"
                                    />
                                    <label className="text-sm text-gray-600">
                                       ¿Autorizas recibir información comercial?
                                    </label>
                                 </div>
                              </div>
                              
                              <div className="w-full h-[1px] bg-[#eeeeee]"></div>  
                              <div className="w-full flex flex-col-reverse sm:flex-row justify-between gap-3">
                                 <button 
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="w-full sm:w-[180px] h-[50px] bg-white border border-[#333333] text-[#333333] rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer"
                                 >
                                    Volver a datos personales
                                 </button>
                                 <button 
                                    type="submit"
                                    className="w-full sm:w-[180px] md:w-[200px] md:font-semibold h-[50px] bg-[#333333] text-white rounded-lg flex items-center justify-center gap-2 hover:bg-[#444444] transition-colors text-sm font-medium cursor-pointer"
                                 >
                                    Continuar a método de pago
                                 </button>
                              </div>
                           </form>
                        </div>
                     )}
                     {step === 3 && (
                        <form onSubmit={handleSubmitPayment(handleStep3Submit)} className="w-full flex flex-col gap-5">
                           <div className="text-2xl text-[#333333] font-bold">Método de Pago</div>
                           <div className="text-sm text-[#A0A0A0]">Seleccione su método de pago preferido</div>
                           
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                              <div 
                                 className={`flex items-center justify-center p-6 border-2 rounded-lg cursor-pointer transition-all
                                    ${selectedPayment === 'card' ? 'border-[#333333]' : 'border-gray-200'}`}
                                 onClick={() => setSelectedPayment('card')}
                              >
                                 <HiOutlineCreditCard className="text-4xl text-gray-600" />
                              </div>
                              <div 
                                 className={`flex items-center justify-center p-6 border-2 rounded-lg cursor-pointer transition-all
                                    ${selectedPayment === 'pse' ? 'border-[#333333]' : 'border-gray-200'}`}
                                 onClick={() => setSelectedPayment('pse')}
                              >
                                 <div className="flex flex-col items-center">
                                    <HiOutlineDocumentText className="text-4xl text-gray-600" />
                                    <span className="mt-2 text-gray-600">PSE</span>
                                 </div>
                              </div>
                           </div>

                           {selectedPayment === 'card' && (
                              <div className="col-span-1 md:col-span-2">
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <InputField 
                                       name="card_name"
                                       inputType="text"
                                       placeholder="Nombre en la tarjeta"
                                       label="Nombre en la tarjeta"
                                       childrenIcon={<HiOutlineUser className="text-2xl"/>}
                                       register={registerPayment}
                                       errors={paymentErrors}
                                       rules={{ required: true }}
                                    />
                                    <InputField 
                                       name="card_number"
                                       inputType="text"
                                       placeholder="XXXX XXXX XXXX XXXX"
                                       label="Número de tarjeta"
                                       childrenIcon={<HiOutlineCreditCard className="text-2xl"/>}
                                       register={registerPayment}
                                       errors={paymentErrors}
                                       rules={{ 
                                           required: true,
                                           pattern: /^[0-9]{16}$/,
                                           maxLength: 16
                                       }}
                                    />
                                    <InputField 
                                       name="expiry_date"
                                       inputType="text"
                                       placeholder="MM/AA"
                                       label="Fecha de expiración"
                                       childrenIcon={<HiOutlineCalendar className="text-2xl"/>}
                                       register={registerPayment}
                                       errors={paymentErrors}
                                       rules={{ 
                                           required: true,
                                           pattern: /^(0[1-9]|1[0-2])\/([0-9]{2})$/
                                       }}
                                    />
                                    <InputField 
                                       name="cvc"
                                       inputType="text"
                                       placeholder="CVC"
                                       label="CVC"
                                       childrenIcon={<HiOutlineLockClosed className="text-2xl"/>}
                                       register={registerPayment}
                                       errors={paymentErrors}
                                       rules={{ 
                                           required: true,
                                           pattern: /^[0-9]{3,4}$/
                                       }}
                                    />
                                 </div>
                                 <div className="flex items-center gap-2 mt-4 text-gray-300 px-5">
                                    <HiOutlineLockClosed className="text-sm" />
                                    <span className="text-xs">Sus datos de pago están seguros y encriptados</span>
                                 </div>
                              </div>
                           )}

                           {selectedPayment === 'pse' && (
                              <div className="col-span-1 md:col-span-2">
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <SelectData
                                       label="Seleccione su banco"
                                       options={banksOptions}
                                       name="bank"
                                       errors={paymentErrors}
                                       rules={{ required: true }}
                                       control={controlPayment}
                                    />
                                    <SelectData
                                       label="Tipo de documento"
                                       options={documentTypeOptions}
                                       name="document_type"
                                       errors={paymentErrors}
                                       rules={{ required: true }}
                                       control={controlPayment}
                                    />
                                 </div>
                                 <div className="flex items-center gap-2 mt-4 text-gray-400">
                                    <HiOutlineLockClosed className="text-sm" />
                                    <span className="text-xs">Conexión segura con su entidad bancaria</span>
                                 </div>
                              </div>
                           )}

                           <div className="w-full flex flex-col-reverse sm:flex-row justify-between gap-3">
                              <button 
                                 type="button"
                                 onClick={() => setStep(2)}
                                 className="w-full sm:w-[180px] md:w-[240px] md:font-semibold h-[50px] bg-white border border-[#333333] text-[#333333] rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer"
                              >
                                 Volver a datos profesionales
                              </button>
                              <button 
                                 type="submit"
                                 className="w-full sm:w-[180px] md:w-[240px] md:font-semibold h-[50px] bg-[#333333] text-white rounded-lg flex items-center justify-center gap-2 hover:bg-[#444444] transition-colors text-sm font-medium cursor-pointer"
                              >
                                 Completar registro
                              </button>
                           </div>
                        </form>
                     )}
                  </div>
               </div>
            </div>
         </div>
    );
}

export default RegisterForm;
