import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepLabel from '@mui/material/StepLabel';
import { useNavigate } from 'react-router';
import CustomStepIcon from './CustomStepIcon';

const CheckoutSteps: FC = () => {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [key: string]: boolean;
  }>(checkoutSteps);

  const handleStep = (step: number, link: string) => () => {
    setActiveStep(step);
    navigate(link);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={1} alternativeLabel>
        {steps.map(({ label, link, id }, index) => (
          <Step key={label} completed={completed[id]} sx={{ display: 'flex' }}>
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
