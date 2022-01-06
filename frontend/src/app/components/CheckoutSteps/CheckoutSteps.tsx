import React, { FC } from 'react';
import { useTypedSelector } from '../../hooks';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepLabel from '@mui/material/StepLabel';
import { useNavigate } from 'react-router';
import CustomStepIcon from '../CustomStepIcon/CustomStepIcon';

const CheckoutSteps: FC = () => {
  const navigate = useNavigate();

  const { checkoutSteps } = useTypedSelector((state) => state.cart);

  const activeStep = checkoutSteps
    .map((step) => step.isActive === true)
    .indexOf(true);

  const handleStep = (step: number, link: string) => () => {
    navigate(link);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {checkoutSteps.map(({ label, link, completed }, index) => (
          <Step key={label} completed={completed} sx={{ display: 'flex' }}>
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
