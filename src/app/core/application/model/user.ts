import { AppRole } from './app-role';
import { Authority } from './authority';

export class User {
    public accountNonExpired: boolean;
    public accountNonLocked: boolean;
    public authorities: Authority[];
    public capabilities: string[];
    public company: string;
    public credentialsNonExpired: boolean;
    public dn: string;
    public docApproverSites: string[];
    public enabled: boolean;
    public firstName: string;
    public id: string;
    public internal: boolean;
    public lastName: string;
    public sites: string[];
    public srsAppRoles: AppRole[];
    public username: string;
}
