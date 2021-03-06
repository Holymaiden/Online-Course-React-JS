import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../../../../layouts/AuthLayout';
// components
import { MHidden } from '../../../../components/@material-extend';
import RegisterForm from './RegisterForm';
import AuthSocial from '../AuthSocial';
import { forwardRef, useEffect, useState } from 'react';
import { useAuth } from '../../../../contexts/auth.context';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = '', ...other }, ref) => (
  <Box ref={ref} {...other}>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    {children}
  </Box>
));

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  },
  background: '#5A47AB',
  color: '#ffffff'
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(6, 0)
}));

// ----------------------------------------------------------------------

export default function SignUp() {
  const history = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      return history('/dashboards');
    }
  }, []);
  return (
    <RootStyle title="Sign Up">
      <AuthLayout>
        Already have an account? &nbsp;
        <Link
          underline="none"
          variant="subtitle2"
          component={RouterLink}
          to="/login"
        >
          Login
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle sx={{ background: '#8254e3' }}>
          <Typography
            variant="h3"
            sx={{ px: 5, mt: 10, mb: 5, color: '#ffffff' }}
          >
            Jadilah Peserta Pelajar
          </Typography>
          <img
            alt="register"
            src="/static/images/illustration/illustration_register.png"
          />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <Card sx={{ p: 4.8, backgroundColor: '#ffffff' }}>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h4" sx={{ color: '#5A47AB' }} gutterBottom>
                Ikutlah dengan kursus, bawa tradisi belajar ke masa depan.
              </Typography>
              <Typography sx={{ color: '#5A47AB' }}>
                Pengalaman belajar sebagai bagian dari komunitas kami.
              </Typography>
            </Box>

            <AuthSocial />

            <RegisterForm />

            <MHidden width="smUp">
              <Typography
                variant="subtitle2"
                sx={{ mt: 3, textAlign: 'center' }}
              >
                Already have an account?&nbsp;
                <Link to="/login" component={RouterLink}>
                  Login
                </Link>
              </Typography>
            </MHidden>
          </Card>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
