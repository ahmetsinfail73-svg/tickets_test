import { Component, Input, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiIcon, TuiLink } from '@taiga-ui/core';
import { TuiFiles, TuiInputFiles, TuiProgressBar } from '@taiga-ui/kit';
import { IAttachment } from '../../../models/attachment.model';
import { AttachmentService } from '../../../services/attachment.service';
import { NotificationService } from '../../../services/notification.service';
import { IInputProps } from '../input-props.types';

interface IFile {
  id: string;
  progress: number;
  isDone: boolean;
  file: File | { name: string; size: number };
}

@Component({
  selector: 'app-file-field',
  imports: [ReactiveFormsModule, TuiFiles, TuiIcon, TuiLink, TuiInputFiles, TuiProgressBar],
  templateUrl: './file-field.html',
  styleUrls: ['./file-field.css', '../input.css'],
})
export class FileField implements OnInit {
  @Input() props!: IInputProps;

  protected readonly fileControl = new FormControl();

  protected readonly files = signal<IFile[]>([]);

  constructor(
    private attachmentService: AttachmentService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit() {
    if (this.props.defaultValue) {
      this.files.set(
        this.props.defaultValue.map((file: IAttachment) => ({
          file: {
            name: file.filepath,
            size: file.size,
          },
          isDone: true,
          progress: 100,
          id: crypto.randomUUID(),
        })),
      );
    }
  }

  protected onChange(files: FileList | null) {
    const file = files?.[0];

    if (!file) {
      return;
    }

    if (this.isMaxCount()) {
      this.notificationService.error(
        `Максимальное количество файлов - ${this.props.meta?.['maxCount']}`,
      );

      return;
    }

    const id = this.generateId();

    this.files.update((prev) => [...prev, { id, file, progress: 0, isDone: false }]);

    this.attachmentService.uploadFile(file, this.props.meta!['ticketId']).subscribe({
      next: (event) => {
        if (!event) return;

        this.files.update((prev) =>
          prev.map((f) => {
            if (f.id === id) {
              return {
                progress: event.progress,
                isDone: event.isDone,
                file: event.body ? { name: event.body.filepath, size: event.body.size } : f.file,
                id: event.body ? event.body.id : f.id,
              } as IFile;
            }
            return f;
          }),
        );
      },
      error: () => {
        this.files.update((prev) => prev.filter((f) => f.id !== id));
      },
    });
  }

  protected removeFile(file: IFile) {
    this.files.update((prev) => prev.filter((f) => f.id !== file.id));
  }

  private isMaxCount() {
    const maxCount = this.props.meta?.['maxCount'] as number | undefined;

    return !!maxCount && this.files().length >= maxCount;
  }

  private generateId() {
    return crypto.randomUUID();
  }
}
