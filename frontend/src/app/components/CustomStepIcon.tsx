import React, { FC } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import { StepIconProps } from '@mui/material/StepIcon';
import { CustomStepIconRoot } from './styledComponents/CustomStepIconRoot';

interface Props {
  props: StepIconProps;
  index: number;
}

const CustomStepIcon: FC<Props> = ({
  props: { active, completed, className, icon },
  index,
}) => {
  const icons: { [index: string]: React.ReactElement } = {
    1: <DoneIcon />,
    2: <DoneIcon />,
    3: <DoneIcon />,
    4: <DoneIcon />,
  };

  return (
    <CustomStepIconRoot
      ownerState={{ completed, active }}
      className={className}
      sx={{ padding: 0.4 }}
    >
      {completed ? icons[String(icon)] : index + 1}
    </CustomStepIconRoot>
  );
};

export default CustomStepIcon;
