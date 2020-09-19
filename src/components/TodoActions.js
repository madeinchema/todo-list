import React from 'react';
import { Flex, Link, PseudoBox, Text, Icon } from '@chakra-ui/core';

export default function TodoActions() {
  return (
    <Link>
      <PseudoBox
        style={{ transition: 'all .1s ease-out' }}
        d='flex'
        opacity='0.5'
        _hover={{ opacity: "1" }}
      >
        <Icon
          alignSelf='center'
          aria-label="Info"
          name="info-outline"
          size='1rem'
        />
      </PseudoBox>
    </Link>
  );
}
