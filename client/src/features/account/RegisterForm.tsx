import { useRegisterMutation } from "./accountApi";
import { registerSchema, type RegisterSchema } from "../../lib/schemas/registerSchema";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function RegisterForm() {

    const [registerUser] = useRegisterMutation();

     const navigate = useNavigate();

    const { register, handleSubmit, setError, formState: { errors, isValid, isLoading} } = useForm<RegisterSchema>({
        mode: 'onTouched',
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (data: RegisterSchema) => {
        try {
            await registerUser(data).unwrap();
            navigate("/");
        } catch (error) {
            const apiError = error as { message: string };
            if (apiError.message && typeof apiError.message === 'string') {
                const errorArray = apiError.message.split(",");
                errorArray.forEach(err => {
                    if(err.includes('password')) {
                          console.log('here - 4');
                        setError('password', { message: err });
                    } else if(err.includes('Username')) {
                        setError('email', { message: err });
                    }
                });
            }
        }
    };


  return (
    <Container component={Paper} maxWidth="sm" sx={{ borderRadius: 3}}>
        <Box display="flex" flexDirection="column" alignItems="center" marginTop={8}>
            <Typography variant="h5">
                &nbsp;
            </Typography>
            <Typography variant="h5">
                Register
            </Typography>
            <Box component="form" width="100%" display="flex" flexDirection="column" gap={3} marginY={3}
            onSubmit={handleSubmit(onSubmit)}>
                <TextField fullWidth label="Email" autoFocus {...register("email")} 
                    error={!!errors.email} helperText={errors.email?.message} />
                <TextField fullWidth label="Password" type="password" {...register("password")} 
                    error={!!errors.password} helperText={errors.password?.message} />
                <Button disabled={isLoading || !isValid} fullWidth variant="contained" color="primary" type="submit">
                    Register
                </Button>
                <Typography sx={{ textAlign: 'center' }}>
                    Already have an account?
                    <Typography sx={{ml:2}} component={Link} to="/login" color="primary">
                        Sign In
                    </Typography>
                </Typography>
            </Box>
        </Box>
    </Container>
  )
}
export default RegisterForm