import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepLabel from '@mui/material/StepLabel';
import { useNavigate } from 'react-router';
import CustomStepIcon from './CustomStepIcon';

const steps = [
  { label: 'Sign In', link: '/login?redirect=shipping' },
  { label: 'Shipping', link: '/shipping' },
  { label: 'Payment', link: '/payment' },
  { label: 'Place Order', link: '/order' },
];

const CheckoutSteps: FC = () => {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [key: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed)) // It's the last step, but not all steps have been completed, find the first step that has been completed
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number, link: string) => () => {
    setActiveStep(step);
    navigate(link);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={1} alternativeLabel>
        {steps.map(({ label, link }, index) => (
          <Step
            key={label}
            completed={completed[index]}
            sx={{ display: 'flex' }}
          >
            <StepButton
              onClick={handleStep(index, link)}
              sx={{
                width: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 'auto',
                paddingTop: 0,
                paddingBottom: 1,
              }}
            >
              <StepLabel
                StepIconComponent={(props) => CustomStepIcon({ props, index })}
              >
                {label}
              </StepLabel>
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default CheckoutSteps;
