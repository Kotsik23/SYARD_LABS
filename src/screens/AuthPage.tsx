import { Button, ButtonGroup, Center, Flex, Heading, useToast } from "@chakra-ui/react"
import { SubmitHandler, useForm } from "react-hook-form"
import { object, SchemaOf, string } from "yup"
import { IAuthFields } from "../shared/interfaces/auth-fields.interface"
import { yupResolver } from "@hookform/resolvers/yup"
import ControlledInput from "../components/ControlledInput"
import { useLoginMutation, useRegisterMutation } from "../features/auth/auth.api"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { ROUTES } from "../constants/routes"

const schema: SchemaOf<IAuthFields> = object({
	email: string().required().email(),
	password: string().required().min(4),
})

const AuthPage = () => {
	const {
		register: registerField,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<IAuthFields>({
		resolver: yupResolver(schema),
	})

	const toast = useToast()
	const navigate = useNavigate()
	const location = useLocation()
	const from = location.state?.from?.pathname

	const [login, { isLoading: isLogin, isError: isLoginError, error: loginError, isSuccess: isLoginSuccess }] =
		useLoginMutation()
	const [
		register,
		{ isLoading: isRegister, isError: isRegisterError, error: registerError, isSuccess: isRegisterSuccess },
	] = useRegisterMutation()

	useEffect(() => {
		if (isRegisterError) {
			console.log(registerError)

			toast({
				title: (registerError as any).data.error,
				description: (registerError as any).data.message,
				status: "error",
				duration: 4000,
				isClosable: true,
			})
		}
		if (isLoginError) {
			toast({
				title: (loginError as any).data.error,
				description: (loginError as any).data.message,
				status: "error",
				duration: 4000,
				isClosable: true,
			})
		}
		if (isLoginSuccess) {
			toast({
				title: "Successfully logged in.",
				description: "Now you are in the system. Enjoy!",
				status: "success",
				duration: 4000,
				isClosable: true,
			})
			reset()
			navigate(from || ROUTES.MAIN_PAGE)
		}
		if (isRegisterSuccess) {
			toast({
				title: "Account created.",
				description: "We've created your account for you.",
				status: "success",
				duration: 4000,
				isClosable: true,
			})
			reset()
			navigate(from || ROUTES.MAIN_PAGE)
		}
	}, [isRegisterError, isLoginError, loginError, registerError, login, register, isLoginSuccess, isRegisterSuccess])

	const handleLogin: SubmitHandler<IAuthFields> = async data => {
		await login(data)
	}

	const handleRegister: SubmitHandler<IAuthFields> = async data => {
		await register(data)
	}

	return (
		<Center minH={"93vh"}>
			<Flex align={"center"} direction="column" justify={"center"} w="full" maxW={400} gap={4} as="form">
				<Heading size={"lg"} textAlign="center" mb={2}>
					Auth Page
				</Heading>
				<ControlledInput {...registerField("email")} label="Email" error={errors.email?.message} />
				<ControlledInput
					{...registerField("password")}
					label="Password"
					error={errors.password?.message}
					type="password"
				/>

				<ButtonGroup size={"md"} isAttached w="full">
					<Button
						type="button"
						w="full"
						colorScheme={"facebook"}
						onClick={handleSubmit(handleLogin)}
						disabled={isLogin}
					>
						Login
					</Button>
					<Button
						type="button"
						w="full"
						colorScheme={"facebook"}
						onClick={handleSubmit(handleRegister)}
						disabled={isRegister}
					>
						Register
					</Button>
				</ButtonGroup>
			</Flex>
		</Center>
	)
}

export default AuthPage
