import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import Account from "../../components/Account/Account";
import { PageWrapper } from "./styles";
function MyAccount() {
    return (_jsx(_Fragment, { children: _jsx(PageWrapper, { children: _jsx(Account, {}) }) }));
}
export default MyAccount;
