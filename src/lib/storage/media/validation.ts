import { IMAGE_FILE_TYPES_ARR, type ImageFileType } from './constants';

export function isImageFileType(maybeImageFileType: unknown): maybeImageFileType is ImageFileType {
	return IMAGE_FILE_TYPES_ARR.indexOf(maybeImageFileType as ImageFileType) > -1;
}
