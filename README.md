## AWS CI-CD: React App on AWS ECS Fargate

<img width="845" height="475" alt="Screenshot 2025-11-17 at 6 53 03 PM" src="https://github.com/user-attachments/assets/cdebd580-b4f2-4357-8d24-7b28978d60ae" />

<img width="768" height="731" alt="Screenshot 2025-11-16 at 7 43 35 PM" src="https://github.com/user-attachments/assets/dfaff7c6-ef2c-48fe-b882-f19e3353ba46" />


## Overview

This project demonstrates a full AWS DevOps CI/CD pipeline to build, containerize, and deploy a React application on AWS ECS Fargate using modern cloud-native tools. It leverages infrastructure-as-code, automated builds, image repositories, and robust deployment automation.

**Key AWS Services Used:**
- **Amazon ECR:** Stores Docker images.
- **AWS CodeBuild:** Builds and tests code, assembles containers.
- **AWS CodePipeline:** Automates build-to-deploy workflow.
- **AWS ECS Fargate:** Runs containers serverlessly.
- **CloudFormation:** Provisions all required resources via infrastructure-as-code.
- **Amazon CloudWatch:** Monitors build, deployment, and application health. Logs pipeline activities and app metrics. 

## Pipeline Flow

1. **Source:** React application code. (see `/aws-devops-project`)
2. **Docker Build:** Source code containerized.
3. **Push to ECR:** Docker image stored in Amazon ECR.
4. **Build & Test:** AWS CodeBuild uses buildspec to build, test, and tag containers.
5. **Deploy:** CodePipeline triggers deployment, pushing the container to ECS Fargate.
6. **Infrastructure:** All resources and permissions created automatically via CloudFormation.
7. **Monitor:** Amazon CloudWatch captures logs and metrics for pipeline, build, and runtime events

## Repository Structure

- `/aws-devops-project` - React app source (see its README for usage)
- `/buildspec.yaml` - Instructions for CodeBuild
- `/Dockerfile` - Container build definition
- `/cloudformation.yaml` - Infrastructure template for entire pipeline
- `/imagedefinitions.json` - Used by CodePipeline for ECS deploy step
- `/README.md` - This documentation

## How to Deploy
```bash
1. **Fork/Clone** this repository.
````
````bash
2. Ensure you have AWS CLI, permissions, and your account set up.
````
````bash
3. Customize any variable/parameter in `cloudformation.yaml` if needed.
````
```bash
4. Run:

aws cloudformation deploy
--template-file cloudformation.yaml
--stack-name react-devops-stack
--capabilities CAPABILITY_IAM
```
```bash
5. Monitor deployment in AWS Console.
```
```bash
6. Push code changes to auto-trigger the pipeline.
```
*For details on developing and running the React app, see `/aws-devops-project/README.md`. For troubleshooting pipelines, check your AWS Console CloudWatch logs for CodeBuild, ECS, and CodePipeline events.*
