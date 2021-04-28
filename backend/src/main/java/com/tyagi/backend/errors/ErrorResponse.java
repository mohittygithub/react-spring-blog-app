package com.tyagi.backend.errors;

public class ErrorResponse {
    private int statusCode;
    private String message;
    private boolean success;

    public ErrorResponse(){}
    
    public ErrorResponse(int statusCode, String message, boolean success){
        this.statusCode = statusCode;
        this.message = message;
        this.success = success;
    }

	public int getStatusCode() {
		return this.statusCode;
	}

	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}

	public String getMessage() {
		return this.message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public boolean isSuccess() {
		return this.success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}


}
