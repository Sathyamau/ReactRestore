import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "../../lib/schemas/loginSchema";
import { useLoginMutation, useLazyUserInfoQuery } from "./accountApi";

const LoginForm = () => {

    const[login, {isLoading}] = useLoginMutation();
    const [fetchUserInfo] = useLazyUserInfoQuery(); 
    const location = useLocation();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema)
    });

    const navigate = useNavigate();

    const onSubmit = async (data: LoginSchema) => {
        await login(data);
        await fetchUserInfo();
        navigate(location.state?.from?.pathname || "/catalog");
    };

  return (
   <Container component={Paper} maxWidth="sm" sx={{ borderRadius: 3}}>
    <Box display="flex" flexDirection="column" alignItems="center" marginTop={8}>
         <Typography variant="h5">
            &nbsp;
        </Typography>
        <Typography variant="h5">
            Sign In
        </Typography>
        <Box component="form" width="100%" display="flex" flexDirection="column" gap={3} marginY={3}
        onSubmit={handleSubmit(onSubmit)}>
            <TextField fullWidth label="Email" autoFocus {...register("email")} 
                error={!!errors.email} helperText={errors.email?.message} />
            <TextField fullWidth label="Password" type="password" {...register("password")} 
                error={!!errors.password} helperText={errors.password?.message} />
            <Button disabled={isLoading} fullWidth variant="contained" color="primary" type="submit">
                Sign In
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
                Don't have an account?
                <Typography sx={{ml:2}} component={Link} to="/register" color="primary">
                    Sign Up
                </Typography>
            </Typography>
        </Box>
    </Box>
   </Container>
  )
}
export default LoginForm