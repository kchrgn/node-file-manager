const ARG_NAME_KEY = '--username=';

export const getUserName = () => {
    const argv = process.argv[2];
    if (argv && argv.startsWith(ARG_NAME_KEY)) {
        const userName = argv.replace(ARG_NAME_KEY, '');
        if (userName) return userName;
    } 

  return 'Anonymus';
}