"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Upload, File, FileText, CircleCheck as CheckCircle, CircleAlert as AlertCircle, X, Loader as Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface UploadedFile {
  name: string;
  size: string;
  type: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
}

export function ResumeUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  };

  const handleFiles = (fileList: File[]) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    
    fileList.forEach((file) => {
      if (!validTypes.includes(file.type)) {
        toast.error(`${file.name} is not a supported file type`);
        return;
      }

      const newFile: UploadedFile = {
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type.includes('pdf') ? 'PDF' : file.type.includes('word') ? 'DOCX' : 'TXT',
        status: 'uploading',
        progress: 0,
      };

      setFiles(prev => [...prev, newFile]);
      simulateUpload(newFile);
    });
  };

  const simulateUpload = (file: UploadedFile) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      
      setFiles(prev => prev.map(f => 
        f.name === file.name ? { ...f, progress: Math.min(progress, 100) } : f
      ));

      if (progress >= 100) {
        clearInterval(interval);
        // Simulate processing
        setTimeout(() => {
          setFiles(prev => prev.map(f => 
            f.name === file.name ? { ...f, status: 'processing' } : f
          ));
          
          // Simulate completion
          setTimeout(() => {
            setFiles(prev => prev.map(f => 
              f.name === file.name ? { ...f, status: 'completed' } : f
            ));
            toast.success(`${file.name} analyzed successfully!`);
          }, 3000);
        }, 1000);
      }
    }, 500);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const removeFile = (fileName: string) => {
    setFiles(prev => prev.filter(f => f.name !== fileName));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploading':
      case 'processing':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <File className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'uploading':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'completed':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <Card className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="h-5 w-5 text-blue-600" />
          <span>Resume Upload</span>
        </CardTitle>
        <CardDescription>
          Upload your resume in PDF, DOCX, or TXT format for AI-powered analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? 'border-blue-400 bg-blue-50/50 dark:bg-blue-900/30'
              : 'border-gray-300 dark:border-gray-500 hover:border-gray-400 dark:hover:border-gray-400'
          }`}
        >
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-600/20 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Drop your resume here
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                or click to browse files
              </p>
            </div>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".pdf,.docx,.txt"
              multiple
              onChange={handleFileInput}
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              Choose Files
            </Button>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Supported formats: PDF, DOCX, TXT (Max 10MB each)
            </div>
          </div>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              Uploaded Files
            </h3>
            <div className="space-y-3">
              {files.map((file, index) => (
                <div key={index} className="p-4 bg-gray-50/50 dark:bg-gray-800/80 rounded-lg border border-gray-200/50 dark:border-gray-600">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(file.status)}
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {file.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-300">
                          {file.size} • {file.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className={getStatusColor(file.status)}>
                        {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                      </Badge>
                      {file.status !== 'uploading' && file.status !== 'processing' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.name)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {(file.status === 'uploading' || file.status === 'processing') && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-300">
                          {file.status === 'uploading' ? 'Uploading...' : 'Processing...'}
                        </span>
                        <span className="font-medium">
                          {file.status === 'uploading' ? `${Math.round(file.progress)}%` : ''}
                        </span>
                      </div>
                      <Progress value={file.status === 'uploading' ? file.progress : 50} className="h-2" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}