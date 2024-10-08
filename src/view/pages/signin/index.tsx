import { Button, Input } from '@nextui-org/react'
import LogoImg from '../../../assets/logo.png'
import { useSignInController } from './useSignInController'

export function SignIn() {
  const { setFormValue, onSubmit } = useSignInController()

  return (
    <div className="w-full flex justify-center items-center">
      <form 
        onSubmit={onSubmit}
        className="w-[90%] md:w-1/2 mt-[10%] max-w-[420px] flex flex-col gap-4">
        <img src={LogoImg}  alt="logo"/>

        <Input 
          type="email"
          placeholder="usuario@email.com" 
          variant="faded"
          label="Email"
          labelPlacement="outside"
          onChange={e => setFormValue('email', e.target.value)}
          isRequired
          required/>
        
        <Input 
          type="password"
          placeholder="digite aqui..." 
          variant="faded"
          label="Senha"
          labelPlacement="outside"
          onChange={e => setFormValue('password', e.target.value)}
          isRequired
          required/>

        <Button 
          type="submit"
          color="primary" 
          variant="solid"
          className="mt-3">
          Entrar
        </Button>
      </form>
    </div>
  )
}