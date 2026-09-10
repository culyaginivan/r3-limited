import { useRef, useState, type DragEvent } from 'react';
import Icon from './Icon';

type DropzoneProps = { file: File | null; onFile: (file: File | null) => void };

export default function Dropzone({ file, onFile }: DropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [hover, setHover] = useState(false);
  const handleFile = (candidate?: File) => {
    if (!candidate) return;
    if (
      candidate.size > 10 * 1024 * 1024 ||
      !['application/pdf', 'image/jpeg', 'image/png'].includes(candidate.type)
    ) {
      setError('Неверный формат или размер файла');
      onFile(null);
      return;
    }
    setError('');
    onFile(candidate);
  };
  const drop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setHover(false);
    handleFile(event.dataTransfer.files[0]);
  };
  const filled = Boolean(file);
  return (
    <div
      className={`dropzone ${hover ? 'dropzone--hover' : ''} ${filled ? 'dropzone--filled' : ''} ${error ? 'dropzone--error' : ''}`}
      onDragEnter={() => setHover(true)}
      onDragOver={(event) => {
        event.preventDefault();
        setHover(true);
      }}
      onDragLeave={(event) => {
        const relatedTarget = event.relatedTarget;
        if (
          !relatedTarget ||
          !(relatedTarget instanceof Node) ||
          !event.currentTarget.contains(relatedTarget)
        ) {
          setHover(false);
        }
      }}
      onDrop={drop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') inputRef.current?.click();
      }}
    >
      <input
        ref={inputRef}
        id="c-file"
        name="document"
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        hidden
        onChange={(event) => handleFile(event.target.files?.[0])}
      />
      <Icon className="dropzone__icon" name={filled || error ? 'clipboard-check' : 'upload'} />
      <span className="dropzone__content">
        <strong>
          {error || (file ? file.name : 'Перетащите файл или выберите на устройстве')}
        </strong>
        <small>
          {file ? `PDF · ${(file.size / 1024).toFixed(0)} КБ` : 'PDF, JPG, PNG — до 10 МБ'}
        </small>
      </span>
      {(filled || error) && (
        <button
          className="dropzone__remove"
          type="button"
          aria-label="Удалить файл"
          onClick={(event) => {
            event.stopPropagation();
            onFile(null);
            setError('');
          }}
        >
          <Icon name="trash" />
        </button>
      )}
    </div>
  );
}
