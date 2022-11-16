import { FlexProps } from '@chakra-ui/react';
import React from 'react';

export interface PaginationButtonProps extends FlexProps {
  children: React.ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
  href: string;
}
