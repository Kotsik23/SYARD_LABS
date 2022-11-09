import { FormControl, Input, FormErrorMessage } from "@chakra-ui/react"
import { ForwardedRef, forwardRef } from "react"

const ControlledInput = forwardRef((props: any, ref: ForwardedRef<HTMLInputElement>) => (
	<FormControl isInvalid={!!props.error}>
		<Input placeholder={props.label} size="lg" ref={ref} {...props} />
		<FormErrorMessage>{props.error && props.error}</FormErrorMessage>
	</FormControl>
))

export default ControlledInput
