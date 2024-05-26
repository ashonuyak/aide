import { SessionDocument } from 'src/modules/session/session.schema';
import { UserDocument } from 'src/modules/user/user.schema';

export interface Session extends SessionDocument {
	readonly user: UserDocument;
}
