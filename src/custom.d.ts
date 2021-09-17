declare module '*.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module 'home/HomeApp' {
  import { mount } from 'home/HomeApp';

  export { mount };
}

declare module 'employees/EmployeesApp' {
  import { mount } from 'employees/EmployeesApp';

  export { mount };
}

declare module 'payroll/PayrollApp' {
  import { mount } from 'payroll/PayrollApp';

  export { mount };
}

declare module 'pensions/PensionsApp' {
  import { mount } from 'pensions/PensionsApp';

  export { mount };
}

declare module 'about/AboutApp' {
  import { mount } from 'about/AboutApp';

  export { mount };
}

type TChildren = (() => JSX.Element | JSX.Element[]) | JSX.Element | JSX.Element[];
